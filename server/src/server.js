// Load environment variables before any other module (e.g. the Cloudinary
// config) is imported, since those read process.env at module-evaluation time.
import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server");
    console.error(error);
  }
};

startServer();
