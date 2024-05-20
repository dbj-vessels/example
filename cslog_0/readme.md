# C# application in a Docker container that logs output



1. **Create a C# application**: This will be a simple console application that logs messages to the console.

2. **Create a Dockerfile**: This file will define the steps to build the Docker image.

3. **Build and run the Docker container**: This will create the Docker image and run the container, capturing the logs.

## The steps

### Step 1: Create a C# Application

Create a new C# console application. 

```bash
dotnet new console -o MyLoggingApp
cd MyLoggingApp
```

Edit the `Program.cs` file to include some logging:

```csharp
using System;

namespace MyLoggingApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Application Started");
            
            for (int i = 1; i <= 10; i++)
            {
                Console.WriteLine($"Logging message {i}");
                System.Threading.Thread.Sleep(1000); // Wait for 1 second
            }
            
            Console.WriteLine("Application Finished");
        }
    }
}
```

### Step 2: Create a Dockerfile

Create a `Dockerfile` in the root of your project directory (`MyLoggingApp`):

```Dockerfile
# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

# Set the working directory
WORKDIR /app

# Copy the project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the application code
COPY . ./

# Build the application
RUN dotnet publish -c Release -o out

# Use the runtime image for a smaller final image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Entry point for the application
ENTRYPOINT ["dotnet", "MyLoggingApp.dll"]
```

### Step 3: Build and Run the Docker Container

1. **Build the Docker image**:

    ```bash
    docker build -t my-logging-app .
    ```

2. **Run the Docker container**:

    ```bash
    docker run --name my-logging-container my-logging-app
    ```

### Step 4: View Logs

> **When you run the container, the logs will be output to the console. You can also view the logs using Docker's logging commands:**

- **View logs of the running container**:

    ```bash
    docker logs my-logging-container
    ```

- **Follow the logs in real-time**:

    ```bash
    docker logs -f my-logging-container
    ```

This setup ensures that your C# application logs messages to the console, which Docker captures. You can then view these logs using Docker commands.