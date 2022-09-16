exports.signIn = async (req, res) => {
   try {
      client.getState().then((data) => {
         if (data) {
            console.log("authenticated");
         }

         res.json({
            message: "success",
            qr: "localhost:5000/upload/qr.png",
         });
      });
   } catch (error) {
      return res.status(500).send({
         success: false,
         message: error.message,
      });
   }
};
