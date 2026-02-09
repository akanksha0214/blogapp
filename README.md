Setup instructions
Step 1 - Clone the repo in your desktop , go inside client and server folder and npm i to install all dependency 
Step 2 - npm run dev to start project from both server and client end 

Brief explanation of how to add new fields to the form
Step 1 - go to server folder -> model-> in user.js add any new field you want 
Step 2 - on controller folder of server -> user.js 
  const { firstName, lastName, phoneNumber, email } = req.body;

        // ✅ Required fields validation
        if (!firstName || !lastName || !phoneNumber || !email) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

mention all fields you added newly and add in check for required 
