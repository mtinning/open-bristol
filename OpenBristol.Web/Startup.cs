using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Google;
using Owin;
using System.Threading.Tasks;

[assembly: OwinStartupAttribute(typeof(OpenBristol.Web.Startup))]
namespace OpenBristol.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.SetDefaultSignInAsAuthenticationType("OpenIdConnect");
            var googleAuthOpts = new GoogleOAuth2AuthenticationOptions
            {
                AuthenticationType = "OpenIdConnect",
                ClientId = "330702203967-1e3dllkoa3bhun0j4gir9aushb9k2abo.apps.googleusercontent.com",
                ClientSecret = "f6PzM6KFBVS66jvTcXGUljt6",
                CallbackPath = new PathString("/oauth2callback"),
                Provider = new GoogleOAuth2AuthenticationProvider
                {
                    OnAuthenticated = async context =>
                    {
                        System.Console.WriteLine($"Authenticated; access token: {context.AccessToken}; name: {context.Name}; email: {context.Email}");
                        await Task.CompletedTask;
                    }
                }
            };
            app.UseGoogleAuthentication(googleAuthOpts);
            app.UseNancy();
        }
    }
}
