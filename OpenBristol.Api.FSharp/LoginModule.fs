namespace OpenBristol.Api.FSharp

open Nancy
open Nancy.Security

open System
open System.Data.Linq
open System.Data.Entity
open Microsoft.FSharp.Data.TypeProviders
open Microsoft.Owin.Security
open Microsoft.Owin.Security.OpenIdConnect

open FSharp.Interop.Dynamic

module Login =

    type private EntityConnection = SqlEntityConnection<ConnectionString="Data Source=SL-WS-207;Initial Catalog=open-bristol;Integrated Security=True;MultipleActiveResultSets=true", Pluralize=true>
    
    let private context = EntityConnection.GetDataContext()

    type LoginModule() =
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

    type AuthenticationModule() as this = 
        inherit NancyModule("/")
        
        do
            base.Get.["/signin"] <- fun (p:Object) -> this.signIn :> Object

        member this.signIn =
            match this.Context.GetAuthenticationManager() with
                | null -> raise(new NotSupportedException("An OWIN authentication manager cannot be found"))
                | m -> m.Challenge(new AuthenticationProperties(RedirectUri = "/"), OpenIdConnectAuthenticationDefaults.AuthenticationType)

            HttpStatusCode.Unauthorized 

        member this.signOut =
            match this.Context.GetAuthenticationManager() with
                | null -> raise(new NotSupportedException("An OWIN authentication manager cannot be found"))
                | m -> 
                    m.SignOut "ClientCookie"
                    m.SignOut OpenIdConnectAuthenticationDefaults.AuthenticationType

            HttpStatusCode.OK