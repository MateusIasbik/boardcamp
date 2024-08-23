
export default function errorHandler(err, req, res, next) {

    if (err.type === "invalidId") {
        return res.status(404).send(err.message);
    }

    if (err.type === "conflict") {
        return res.status(409).send(err.message);
    }

    if (err.type === "invalidStock") {
        return res.status(422).send(err.message);
    }

    if (err.type === "RentNotFinalized") {
        return res.status(422).send(err.message);
    }
    
    res.status(500).send(err.message)
}