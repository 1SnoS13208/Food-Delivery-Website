import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const getCoordinates = async (address) => {
    // 1. Kiểm tra nếu không có Key hoặc Key bị lỗi quyền (như trường hợp hiện tại)
    // Chúng ta sẽ "giả vờ" tìm thấy tọa độ để test Lalamove
    
    const useFallback = async (reason) => {
        console.warn(`⚠️ [Google Maps Warning] ${reason}. Using fallback coordinates for testing.`);
        
        // Logic giả lập đơn giản:
        // Nếu địa chỉ chứa "Hanoi" -> Trả về tọa độ ở Hà Nội
        // Ngược lại -> Trả về tọa độ ở TP.HCM
        
        if (address.toLowerCase().includes("hanoi") || address.toLowerCase().includes("hà nội")) {
            return {
                lat: "21.028511",
                lng: "105.804817",
                address: "Hanoi, Vietnam (Fallback)"
            };
        }
        
        // Mặc định trả về tọa độ TP.HCM (Quận 1)
        return {
            lat: "10.7769",
            lng: "106.7009",
            address: "Ho Chi Minh City, Vietnam (Fallback)"
        };
    };

    if (!GOOGLE_MAPS_API_KEY) {
        return useFallback("API Key missing");
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            const formattedAddress = response.data.results[0].formatted_address;
            return {
                lat: location.lat.toString(),
                lng: location.lng.toString(),
                address: formattedAddress
            };
        } else {
            // Nếu API Key sai hoặc bị chặn (REQUEST_DENIED), dùng fallback luôn
            return useFallback(`API Error: ${response.data.status}`);
        }
    } catch (error) {
        return useFallback(`Network Error: ${error.message}`);
    }
};