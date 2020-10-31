import { Component, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";

import { ResourcesService } from "../../services/resources.service";
import { BaseMapComponent } from "../base-map.component";
import { PrivatePoiEditDialogComponent, IPrivatePoiEditDialogComponentData } from "./private-poi-edit-dialog.component";

@Component({
    selector: "private-poi-category-select",
    templateUrl: "./private-poi-category-select-dialog.component.html"
})
export class PrivatePoiCategorySelectDialogComponent extends BaseMapComponent {
    private data: IPrivatePoiEditDialogComponentData

    constructor(resources: ResourcesService,
        private readonly dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) data: IPrivatePoiEditDialogComponentData) {
        super(resources);
        this.data = data;
    }

    public openPrivatePoiEditDialog(poiType: string) {
        this.data.marker.type = poiType;
        this.dialog.open(PrivatePoiEditDialogComponent, {
            data: this.data
        });
    }
}