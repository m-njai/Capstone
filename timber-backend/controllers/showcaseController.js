exports.uploadShowcase = async (req, res) => {
    try {
      const { title, description, location, tags, featured } = req.body;
      const files = req.files;
  
      // You can process and save this data to MongoDB if needed
      res.status(201).json({ message: 'Showcase uploaded', files });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ message: 'Upload failed' });
    }
  };
  