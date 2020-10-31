import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";

import { LoggingService } from "./logging.service";
import { ScreenService } from "./screen.service";
import { DatabaseService } from "./database.service";
import { ApplicationExitService } from "./application-exit.service";
import { OpenWithService } from "./open-with.service";
import { PurchaseService } from "./purchase.service";
import { UseAppDialogComponent } from "../components/dialogs/use-app-dialog.component";
import { RunningContextService } from "./running-context.service";
import { DragAndDropService } from "./drag-and-drop.service";
import { PoiService } from "./poi.service";
import { RecordedRouteService } from "./recorded-route.service";
import { DeviceOrientationService } from "./device-orientation.service";

@Injectable()
export class ApplicationInitializeService {
    constructor(private readonly dialog: MatDialog,
                private readonly loggingService: LoggingService,
                private readonly screenService: ScreenService,
                private readonly databaseService: DatabaseService,
                private readonly applicationExitService: ApplicationExitService,
                private readonly openWithService: OpenWithService,
                private readonly purchaseService: PurchaseService,
                private readonly runnincContextService: RunningContextService,
                private readonly dragAndDropService: DragAndDropService,
                private readonly poiService: PoiService,
                private readonly deviceOrientationService: DeviceOrientationService,
                private readonly recordedRouteService: RecordedRouteService
    ) {
    }

    public async initialize() {
        try {
            await this.loggingService.initialize();
            await this.loggingService.info("---------------------------------------");
            await this.loggingService.info("Starting IHM Application Initialization");
            this.screenService.initialize();
            await this.databaseService.initialize();
            this.applicationExitService.initialize();
            this.openWithService.initialize();
            this.purchaseService.initialize();
            this.dragAndDropService.initialize();
            if (this.runnincContextService.isMobile
                && !this.runnincContextService.isCordova
                && !this.runnincContextService.isIFrame) {
                UseAppDialogComponent.openDialog(this.dialog);
            }
            this.poiService.initialize(); // do not wait for it to complete
            this.recordedRouteService.initialize();
            this.deviceOrientationService.initialize();
            await this.loggingService.info("Finished IHM Application Initialization");
        } catch (ex) {
            if (ex.toString().indexOf("A mutation operation was attempted on a database that did not allow mutations") !== -1) {
                alert("Sorry, this site does not support running FireFox in private mode...");
            } else {
                alert(`alert("Ooopppss... Any chance you can take a screenshot and send it to israelhikingmap@gmail.com?` +
                    `\nInit failed: ${ex.toString()}`);
            }
            this.loggingService.error(`Failed IHM Application Initialization: ${ex.toString()}`);
        }
        if (new Date() > new Date("2021-07-01")) {
            alert("License expired! Please contact app's manufactor.");
            throw new Error("License expired");
        }
    }
}
