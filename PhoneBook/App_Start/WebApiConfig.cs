using System.Web.Http;

namespace PhoneBook
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Конфигурация и службы веб-API

            // Маршруты веб-API
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "controller/{action}/{id}",
                defaults: new {id = RouteParameter.Optional}
                );
        }
    }
}