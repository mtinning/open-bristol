namespace OpenBristol.Api.FSharp

open Nancy

open System
open System.Data.Linq
open System.Data.Entity
open Microsoft.FSharp.Data.TypeProviders

open FSharp.Interop.Dynamic

module LoginModuleGroup =

    type private EntityConnection = SqlEntityConnection<ConnectionString="Data Source=SL-WS-207;Initial Catalog=open-bristol;Integrated Security=True;MultipleActiveResultSets=true", Pluralize=true>
    
    let private context = EntityConnection.GetDataContext()

    type LoginModuleScoped() =
        inherit NancyModule("/login")

        let random = new Random()

        let updateSession origin id =
            query {
                for session in context.Sessions do
                where (session.RequestUrl = origin)
                select session } 
            |> Seq.tryFind (fun _ -> true)
            |> fun s -> 
                match s with
                | Some ses -> 
                    ses.SessionId <- id
                | None -> 
                    let newSession = new EntityConnection.ServiceTypes.Session(SessionId = id, RequestUrl = origin)
                    context.DataContext.AddObject("Sessions", newSession)

            context.DataContext.SaveChanges() |> ignore

        let login =
            let id = random.Next()
            id |> updateSession 0
            id

        do
            base.Get.["/"] <- fun (p:Object) -> login |> sprintf "%d" :> Object

    type GConnectModuleScoped() =
        inherit NancyModule("/gconnect")

        let getSession origin =
            query {
                for session in context.Sessions do
                where (session.RequestUrl = origin)
                select session }
            |> Seq.tryFind (fun _ -> true)

        let isSessionValid origin sessionId =
            match getSession origin with 
                | Some s -> s.SessionId = sessionId
                | None -> false

        do
            base.Post.["/{sessionId}"] <- fun (p:Object) ->  p?sessionId.ToString() |> Int32.Parse |> isSessionValid 0 :> Object

type LoginModule() = inherit LoginModuleGroup.LoginModuleScoped()
type GConnectModule() = inherit LoginModuleGroup.GConnectModuleScoped()