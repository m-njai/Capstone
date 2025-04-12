const fetchProjects = async () => {
    try {
      const config = await getAuthHeader();
      const res = await axios.get("/api/projects", config);
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };
  