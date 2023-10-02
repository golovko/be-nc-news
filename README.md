# Setting Up Environment Variables

To successfully run this project locally, you'll need to set up two environment variable files: .env.test and .env.development. These files are not included in the repository and are listed in the .gitignore to keep your sensitive information safe. Here's how to create them:

# Create the Environment Variable Files
In the root directory of the cloned repository, create two environment variable files: .env.test and .env.development. You can do this manually or by using your preferred text editor. 

# Populate Environment Variables
Edit the respective environment variable files you created (.env.test and .env.development) and populate them with your specific values. These files will contain sensitive information, so be cautious and keep them secure.

# Usage
Your project should now be configured to use these environment variables locally. When you run your application or tests, they will automatically pick up the configurations from these files.

Important: Do not commit these environment variable files to the repository. Make sure they remain in your local environment only.

With these environment variables in place, you should be able to run the project locally without any issues. 