import 'dotenv/config'; 
import { getDeliveryQuote } from './services/lalamoveService.js';

const runTest = async () => {
    console.log("🚀 Bắt đầu test Lalamove API...");

    const pickupLocation = {
        lat: "10.771595",
        lng: "106.704384",
        address: "Bitexco Financial Tower, District 1, HCMC"
    };

    const dropoffLocation = {
        lat: "10.795092",
        lng: "106.721863",
        address: "Landmark 81, Binh Thanh District, HCMC"
    };

    try {
        console.log(`📦 Đang lấy báo giá...`);
        
        const response = await getDeliveryQuote(pickupLocation, dropoffLocation);
        
        console.log("\n🔍 FULL RESPONSE DATA (Debug):");
        console.dir(response, { depth: null }); 

        const quotationData = response.data || response;

        if (quotationData && quotationData.priceBreakdown) {
            console.log("\n✅ KẾT QUẢ THÀNH CÔNG:");
            console.log("------------------------------------------------");
            console.log("💰 Tổng phí:", quotationData.priceBreakdown.total);
            console.log("🆔 Quotation ID:", quotationData.quotationId);
            console.log("------------------------------------------------");
        } else {
            console.log("\n⚠️ Cấu trúc phản hồi khác mong đợi. Hãy kiểm tra 'FULL RESPONSE DATA' ở trên.");
        }

    } catch (error) {
        console.error("\n❌ KẾT QUẢ THẤT BẠI:");
        console.error("Lỗi:", error.message);
        if (error.response) {
            console.error("Chi tiết từ Lalamove:", JSON.stringify(error.response.data, null, 2));
        }
    }
};

runTest();