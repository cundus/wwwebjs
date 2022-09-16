exports.sendMessage = async (req, res) => {
   try {
      const { body } = req;
      let data = JSON.parse(body.data);

      await Promise.all(
         data.map(async (item) => {
            await client.sendMessage(item.number, item.message);
         })
      );

      res.status(400).json({
         success: true,
         message: "Success Blast Message!",
      });
   } catch (error) {
      console.log(error);
      return res.status(500).send({
         success: false,
         message: error.message,
      });
   }
};
