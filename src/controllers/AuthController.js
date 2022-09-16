exports.signIn = async (req, res) => {
   try {
      client.getState().then((data) => {
         if (data) {
            console.log("authenticated");
         }

         res.json({
            success: true,
            message: "success",
            data: "localhost:5000/upload/qr.png",
         });
      });
   } catch (error) {
      return res.status(500).send({
         success: false,
         message: error.message,
      });
   }
};

exports.checkAuth = async (req, res) => {
   client
      .getState()
      .then((data) => {
         console.log(data);
         res.json({
            success: true,
            message: "Sudah Terautentikasi",
            data,
         });
      })
      .catch((err) => {
         if (err) {
            res.status(400).send({
               success: false,
               message: "Disconnected",
            });
         }
      });
};
