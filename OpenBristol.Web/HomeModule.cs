namespace OpenBristol.Web
{
    public class HomeModule : Nancy.NancyModule
    {
        public HomeModule()
        {
            this.Get["/"] = _ => this.View["/index"];
        }
    }
}