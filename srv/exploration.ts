import * as cds from "@sap/cds";
import * as KnownGalaxies from "./entities/exploration";

export = (srv: cds.Service) => {

    srv.on("sendCommunicationRequest", async (req) => {
        return KnownGalaxies.sendCommunicationRequest(req);
    });

    srv.on("decipherMessage", async (req) => {
        return KnownGalaxies.decipherMessage(req);
    });
};
