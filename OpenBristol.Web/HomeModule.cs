using Nancy;

namespace OpenBristol.Web
{
    public class HomeModule : Nancy.NancyModule
    {
        public HomeModule()
        {
            this.Get["/"] = _ => this.View["/index"];
            this.After.AddItemToEndOfPipeline(ctx => ctx.Response
                .WithHeader("Access-Control-Allow-Origin", "*")
                .WithHeader("Access-Control-Allow-Methods", "POST,GET")
                .WithHeader("Access-Control-Allow-Headers", "Accept, Origin, Content-type"));
        }
    }
}