interface Bicycle {
    brand: string;
    model: string;
    registrationNo: string;
    price: number;
    availability: boolean;
    locationId: number;
    dealerId: string;
}
// export Bicycle;

class BicycleModel implements Bicycle {
    brand: string;
    model: string;
    registrationNo: string;
    price: number;
    availability: boolean;
    locationId: number;
    dealerId: string;
    constructor() {
        this.brand = '';
        this.model = '';
        this.registrationNo = '';
        this.price = 0;
        this.availability = true;
        this.locationId = 0;
        this.dealerId = '';
    }
}
export {Bicycle, BicycleModel};
