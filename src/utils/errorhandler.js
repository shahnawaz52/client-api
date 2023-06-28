const errorhandler = (error, res) => {
    console.log(error);
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
};

export default errorhandler;