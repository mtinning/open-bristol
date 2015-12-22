using Nancy.Conventions;

namespace OpenBristol.Web
{
    public class Bootstrapper : Nancy.DefaultNancyBootstrapper
    {
        protected override void ConfigureConventions(NancyConventions conventions)
        {
            conventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("/", "views/content"));
            base.ConfigureConventions(conventions);
        }
    }
}