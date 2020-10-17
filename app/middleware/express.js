exports.controllerCallback = (controller) => {
    return async (req, res) => {
        try {
            let controllerResponse = await controller(req, res);
            typeof controllerResponse !== typeof undefined && res.send(controllerResponse);
        } catch (e) {
            if (e.errorCode) {
                res.status(e.httpStatusCode || 400).send({ ...e.getMessage() });
            } else if (e.data) {
                res.status(400).send(e.data);
            } else if (e.nativeError && e.nativeError.code) {
                res.status(409).send({
                    message: e.nativeError.detail,
                });
            } else {
                res.status(500).send({
                    message: 'Something bad happened!',
                });
            }
        }
    };
};
