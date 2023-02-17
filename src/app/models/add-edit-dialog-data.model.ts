import { BicycleModel } from './bicycle.model';
export class AddEditDialogDataModel extends BicycleModel {
    isEdit: boolean;
    constructor() {
        super();
        this.isEdit = false;
    }
}
