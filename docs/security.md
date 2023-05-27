
[Manage JSON Web Tokens in development with dotnet user-jwts](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/jwt-authn?view=aspnetcore-7.0&tabs=windows)

`.NET` `C#` specific: [Configure Windows Authentication in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/windowsauth?view=aspnetcore-7.0&tabs=visual-studio)

Surprisingly enough this is also about code security: [When should I use Lazy<T>](https://stackoverflow.com/questions/6847721/when-should-i-use-lazyt)?

> Replaces: `get { if (foo == null) foo = new Foo(); return foo; }`. 
>
> Note that `get { if (foo == null) foo = new Foo(); return foo; }` is not thread-safe, `while Lazy<T>` is thread-safe by default
>
> REMEMBER: Lazy initialization is thread-safe, but it doesn't protect the object after creation. You must lock the object before accessing it, unless the type is thread safe