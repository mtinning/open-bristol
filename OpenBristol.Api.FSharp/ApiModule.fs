namespace OpenBristol.Api.FSharp

open System
open System.Collections.Generic

open FSharp.Interop.Dynamic

open Nancy

type ApiModule() =
    inherit NancyModule("/api")

    do
        base.Get.["/{message}"] <- fun (p:Object) -> p?message :> Object