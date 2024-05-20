
            Console.WriteLine("Application Started");
            
            for (int i = 1; i <= 10; i++)
            {
                Console.WriteLine($"Logging message {i}");
                System.Threading.Thread.Sleep(1000); // Wait for 1 second
            }
            
            Console.WriteLine("Application Finished");
        