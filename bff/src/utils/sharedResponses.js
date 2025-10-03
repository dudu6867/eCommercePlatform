const SharedResponses = {
  ErrorResponse(res, status, data, message) {
    res.status(status).json({
      error: true,
      message,
      details: data,
    });
  },
};

export default SharedResponses;