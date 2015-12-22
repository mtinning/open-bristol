using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(OpenBristol.Web.Startup))]
namespace OpenBristol.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseNancy();
        }
    }
}
