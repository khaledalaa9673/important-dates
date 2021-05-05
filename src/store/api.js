import axios from "axios"
import * as mime from 'react-native-mime-types';


 
export const getAllDates = () => {
    return async (dispatch, getState) => {
        const token = getState().Auth.token
         try {
            const response = await axios.get("https://important-dates.roqay.solutions/api/all_dates", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                const allDates = response.data
          return allDates
             } else {
                throw new Error("Something Went Wrong")
            }
        } catch (error) {
            throw new Error(error)
        }


    }

}
     ///  old  requests 
// export const addMyData = async (gender, civil_id_renewal_date, residency_renewal_date, license_renewal_date, car_insurance_date, civil_id_image, birth_certificate_image, residency_image, token) => {
//     // const data = {
//     //     gender: gender,
//     //     civil_id_renewal_date: civil_id_renewal_date,
//     //     residency_renewal_date: residency_renewal_date,
//     //     license_renewal_date: license_renewal_date,
//     //     car_insurance_date: car_insurance_date,
//     //     civil_id_image: civil_id_image,
//     //     birth_certificate_image: birth_certificate_image,
//     //     residency_image: residency_image
//     // }
    
//     let formData = new FormData();
//     formData.append('gender',gender );
//     formData.append('civil_id_renewal_date',civil_id_renewal_date);
//     formData.append("residency_renewal_date", residency_renewal_date);
//     formData.append('license_renewal_date',license_renewal_date );
//     formData.append('car_insurance_date',car_insurance_date );
//     formData.append('civil_id_image', {
//         uri: civil_id_image,         
//         type: mime.lookup(civil_id_image),  
//         name: `upload.${civil_id_image.split('.').pop()}`    
//     });
//     formData.append('birth_certificate_image', {
//         uri: birth_certificate_image,         
//         type: mime.lookup(birth_certificate_image),  
//         name: `upload.${birth_certificate_image.split('.').pop()}`    
 
//     });
//     formData.append('residency_image', {
//         uri: residency_image,         
//         type: mime.lookup(residency_image),  
//         name: `upload.${residency_image.split('.').pop()}`    
//     });
  
//     try {
//         const response = await axios.post("https://important-dates.roqay.solutions/api/add_my_data", formData, {


//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         })
//         if (response.status === 200) {
//             console.log(response)
//         } else {
//             throw new Error("Something Went Wrongg")
//         }
//     } catch (error) {
//         throw new Error(error)
//     }


// }

// export const addIndependentData=async(first_name,last_name,nationality,phone_number,email,gender,type,user_id,residency_renewal_date,license_renewal_date,car_insurance_date,civil_id_image,birth_certificate_image,residency_image, token)=>{
//     let formData = new FormData();
//     formData.append('first_name',first_name );
//     formData.append('last_name',last_name );
//     formData.append('nationality',nationality );
//     formData.append('phone_number',phone_number );
//     formData.append('email',email );
//     formData.append('type',type );
//     formData.append('user_id',user_id );
//     formData.append('gender',gender );
//     formData.append('civil_id_renewal_date',civil_id_renewal_date);
//     formData.append("residency_renewal_date", residency_renewal_date);
//     formData.append('license_renewal_date',license_renewal_date );
//     formData.append('car_insurance_date',car_insurance_date );
//     formData.append('civil_id_image', {
//         uri: civil_id_image,         
//         type: mime.lookup(civil_id_image),  
//         name: `upload.${civil_id_image.split('.').pop()}`    
//     });
//     formData.append('birth_certificate_image', {
//         uri: birth_certificate_image,         
//         type: mime.lookup(birth_certificate_image),  
//         name: `upload.${birth_certificate_image.split('.').pop()}`    
 
//     });
//     formData.append('residency_image', {
//         uri: residency_image,         
//         type: mime.lookup(residency_image),  
//         name: `upload.${residency_image.split('.').pop()}`    
//     });
  
//     try {
//         const response = await axios.post("https://important-dates.roqay.solutions/api/add_independent_data", formData, {


//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         })
//         if (response.status === 200) {
//             console.log(response)
//         } else {
//             throw new Error("Something Went Wrongg")
//         }
//     } catch (error) {
//         throw new Error(error)
//     }


// }
