interface Booking {
    bookingId: number;
    bicycleId: string;
    customerId: string;
    dealerId: string;
    startDate: Date;
    endDate: Date;
}
class BookingModel implements Booking {
    bookingId: number;
    bicycleId: string;
    customerId: string;
    dealerId: string;
    startDate: Date;
    endDate: Date;

    constructor() {
        this.bookingId = 0;
        this.bicycleId = '';
        this.customerId = '';
        this.dealerId = '';
        this.startDate = new Date();
        this.endDate = new Date();
    }
}
export {Booking, BookingModel};
