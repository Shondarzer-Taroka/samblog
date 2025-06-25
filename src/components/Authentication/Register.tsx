// 'use client';
// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import {
//   FaUser,
//   FaEnvelope,
//   FaPhoneAlt,
//   FaLock,
//   FaHome,
//   FaCamera,
// } from 'react-icons/fa';
// import BdAddress, { bdUnions, bdPostCodes } from 'bd-address';
// import { useToast } from '@/hooks/useToast';
// import Toast from '@/share/Toast';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//     address: '',
//     division: '',
//     district: '',
//     thana: '',
//     union: '',
//     postCode: '',
//   });

//   const { toast, showToast, hideToast } = useToast();

//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [districts, setDistricts] = useState([]);
//   const [thanas, setThanas] = useState([]);
//   const [unions, setUnions] = useState([]);
//   const [divisions, setDivisions] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   console.log(uploading);


//   useEffect(() => {
//     setDivisions(BdAddress.divisions());
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === 'division'
//         ? { district: '', thana: '', union: '', postCode: '' }
//         : {}),
//       ...(name === 'district' ? { thana: '', union: '', postCode: '' } : {}),
//       ...(name === 'thana' ? { union: '', postCode: '' } : {}),
//       ...(name === 'union' ? { postCode: '' } : {}),
//     }));

//     if (name === 'division') {
//       const selected = divisions.find((d) => d.bn_name === value);
//       if (selected) {
//         setDistricts(BdAddress.district(selected.id));
//         setThanas([]);
//         setUnions([]);
//       }
//     }

//     if (name === 'district') {
//       const selected = districts.find((d) => d.bn_name === value);
//       if (selected) {
//         setThanas(BdAddress.upazilla(selected.id));
//         setUnions([]);
//       }
//     }

//     if (name === 'thana') {
//       const selected = thanas.find((t) => t.bn_name === value);
//       if (selected) {
//         const u = bdUnions().filter((u) => u.upazilla_id === selected.id);
//         setUnions(u);
//       }
//     }

//     if (name === 'union') {
//       const selectedUnion = unions.find((u) => u.bn_name === value);
//       if (selectedUnion) {
//         let matchedPostCode = '';

//         for (const key in bdPostCodes()) {
//           const entry = bdPostCodes()[key];
//           if (entry?.bn?.suboffice?.includes(selectedUnion.bn_name)) {
//             matchedPostCode = entry.bn.postcode.trim();
//             break;
//           }
//         }

//         setFormData((prev) => ({
//           ...prev,
//           union: value,
//           postCode: matchedPostCode,
//         }));
//       }
//     }
//   };




//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', 'my-uploads'); // replace
//       formData.append('cloud_name', 'dw72swggv'); // replace
//       setUploading(true);

//       fetch('https://api.cloudinary.com/v1_1/dw72swggv/image/upload', {
//         method: 'POST',
//         body: formData,
//       })
//         .then(res => res.json())
//         .then(data => {
//           if (data.secure_url) {
//             setProfileImage(data.secure_url);
//             showToast('success', '✅ প্রোফাইল ছবি আপলোড হয়েছে');
//           } else {
//             showToast('error', '❌ ছবি আপলোড ব্যর্থ হয়েছে');
//           }
//         })
//         .catch(() => {
//           showToast('error', '❌ ছবি আপলোডে সমস্যা হয়েছে');
//         })
//         .finally(() => setUploading(false))
//     }
//   };


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         ...formData,
//         image: profileImage,
//       };

//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         showToast('success', 'নিবন্ধন সফল হয়েছে');
//       } else {
//         showToast('error', data?.message || 'নিবন্ধন ব্যর্থ হয়েছে');
//       }
//     } catch (err) {
//       console.error(err);
//       showToast('error', 'সার্ভার সমস্যার কারণে নিবন্ধন ব্যর্থ হয়েছে');
//     }
//   };


//   return (
//     <section className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow-md w-full h-full max-w-2xl space-y-5"
//       >
//         <h2 className="text-2xl font-bold mb-4">নিবন্ধন ফর্ম</h2>

//         {/* Profile Image */}
//         <div className="flex items-center gap-6">
//           <div className="relative w-24 h-24">
//             {profileImage ? (
//               <Image
//                 src={profileImage}
//                 alt="Profile"
//                 fill
//                 className="rounded-full object-cover border"
//               />
//             ) : (
//               <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-2xl">
//                 <FaUser />
//               </div>
//             )}
//             <label className="absolute bottom-0 right-0 bg-red-600 text-white p-1 rounded-full cursor-pointer">
//               <FaCamera />
//               <input
//                 type="file"
//                 className="hidden"
//                 onChange={handleImageChange}
//               />
//             </label>
//           </div>
//           <p className="text-sm text-gray-600">প্রোফাইল ছবি আপলোড করুন</p>
//         </div>

//         {/* Inputs with Icons */}



//         <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//           <div className="relative">
//             <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               name="name"
//               placeholder="পূর্ণ নাম"
//               className="w-full border p-2 pl-10 rounded"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="relative">
//             <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="email"
//               name="email"
//               placeholder="ইমেইল"
//               className="w-full border p-2 pl-10 rounded"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="relative">
//             <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               name="phone"
//               placeholder="ফোন নম্বর"
//               className="w-full border p-2 pl-10 rounded"
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>




//         <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//           <div className="relative">
//             <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="password"
//               name="password"
//               placeholder="পাসওয়ার্ড"
//               className="w-full border p-2 pl-10 rounded"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="relative">
//             <FaHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               name="address"
//               placeholder="বর্তমান ঠিকানা"
//               className="w-full border p-2 pl-10 rounded"
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         {/* Dropdowns */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <select
//             name="division"
//             value={formData.division}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           >
//             <option value="">বিভাগ</option>
//             {divisions.map((d) => (
//               <option key={d.id} value={d.bn_name}>
//                 {d.bn_name}
//               </option>
//             ))}
//           </select>

//           <select
//             name="district"
//             value={formData.district}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             disabled={!formData.division}
//             required
//           >
//             <option value="">জেলা</option>
//             {districts.map((d) => (
//               <option key={d.id} value={d.bn_name}>
//                 {d.bn_name}
//               </option>
//             ))}
//           </select>

//           <select
//             name="thana"
//             value={formData.thana}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             disabled={!formData.district}
//             required
//           >
//             <option value="">থানা</option>
//             {thanas.map((t) => (
//               <option key={t.id} value={t.bn_name}>
//                 {t.bn_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Union and Postcode */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <select
//             name="union"
//             value={formData.union}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             disabled={!formData.thana}
//             required
//           >
//             <option value="">ইউনিয়ন</option>
//             {unions.map((u) => (
//               <option key={u.id} value={u.bn_name}>
//                 {u.bn_name}
//               </option>
//             ))}
//           </select>

//           <input
//             type="text"
//             name="postCode"
//             value={formData.postCode}
//             placeholder="পোস্ট কোড"
//             className="border p-2 rounded"
//             onChange={handleChange}
//           />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold"
//         >
//           নিবন্ধন করুন
//         </button>
//       </form>
//       {toast && (
//         <Toast type={toast.type} message={toast.message} onClose={hideToast} />
//       )}
//     </section>
//   );
// };

// export default Register;


























'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaLock,
  FaHome,
  FaCamera,
} from 'react-icons/fa';
import BdAddress, { bdUnions, bdPostCodes } from 'bd-address';
import { useToast } from '@/hooks/useToast';
import Toast from '@/share/Toast';





type Division = {
  id: string;
  name: string;
  bn_name: string;
  url: string;
};

type District = {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  lon: string;
  url: string;
};

type Upazilla = {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url: string;
};

type Union = {
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url: string;
};

type PostCodeEntry = {
  en: {
    division: string;
    district: string;
    thana: string;
    suboffice: string;
    postcode: string;
  };
  bn: {
    division: string;
    district: string;
    thana: string;
    suboffice: string;
    postcode: string;
  };
};


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    division: '',
    district: '',
    thana: '',
    union: '',
    postCode: '',
  });

  const { toast, showToast, hideToast } = useToast();

  const [profileImage, setProfileImage] = useState<string | null>(null);
const [divisions, setDivisions] = useState<Division[]>([]);
const [districts, setDistricts] = useState<District[]>([]);
const [thanas, setThanas] = useState<Upazilla[]>([]);
const [unions, setUnions] = useState<Union[]>([]);

  const [uploading, setUploading] = useState(false);
  console.log(uploading);


  useEffect(() => {
    setDivisions(BdAddress.divisions());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'division'
        ? { district: '', thana: '', union: '', postCode: '' }
        : {}),
      ...(name === 'district' ? { thana: '', union: '', postCode: '' } : {}),
      ...(name === 'thana' ? { union: '', postCode: '' } : {}),
      ...(name === 'union' ? { postCode: '' } : {}),
    }));

    if (name === 'division') {
      const selected = divisions.find((d) => d.bn_name === value);
      if (selected) {
        setDistricts(BdAddress.district(selected.id));
        setThanas([]);
        setUnions([]);
      }
    }

    if (name === 'district') {
      const selected = districts.find((d) => d.bn_name === value);
      if (selected) {
        setThanas(BdAddress.upazilla(selected.id));
        setUnions([]);
      }
    }

    if (name === 'thana') {
      const selected = thanas.find((t) => t.bn_name === value);
      if (selected) {
        const u = bdUnions().filter((u: { upazilla_id: string; }) => u.upazilla_id === selected.id);
        setUnions(u);
      }
    }

  if (name === 'union') {
  const selectedUnion = unions.find((u) => u.bn_name === value);
  if (selectedUnion) {
    let matchedPostCode = '';

    const allPostCodes = bdPostCodes() as Record<string, PostCodeEntry>;

    for (const key in allPostCodes) {
      const entry = allPostCodes[key];
      if (entry?.bn?.suboffice?.includes(selectedUnion.bn_name)) {
        matchedPostCode = entry.bn.postcode.trim();
        break;
      }
    }

    setFormData((prev) => ({
      ...prev,
      union: value,
      postCode: matchedPostCode,
    }));
  }
}

  };




  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'my-uploads'); // replace
      formData.append('cloud_name', 'dw72swggv'); // replace
      setUploading(true);

      fetch('https://api.cloudinary.com/v1_1/dw72swggv/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.secure_url) {
            setProfileImage(data.secure_url);
            showToast('success', '✅ প্রোফাইল ছবি আপলোড হয়েছে');
          } else {
            showToast('error', '❌ ছবি আপলোড ব্যর্থ হয়েছে');
          }
        })
        .catch(() => {
          showToast('error', '❌ ছবি আপলোডে সমস্যা হয়েছে');
        })
        .finally(() => setUploading(false))
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        image: profileImage,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        showToast('success', 'নিবন্ধন সফল হয়েছে');
      } else {
        showToast('error', data?.message || 'নিবন্ধন ব্যর্থ হয়েছে');
      }
    } catch (err) {
      console.error(err);
      showToast('error', 'সার্ভার সমস্যার কারণে নিবন্ধন ব্যর্থ হয়েছে');
    }
  };


  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full h-full max-w-2xl space-y-5"
      >
        <h2 className="text-2xl font-bold mb-4">নিবন্ধন ফর্ম</h2>

        {/* Profile Image */}
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile"
                fill
                className="rounded-full object-cover border"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-2xl">
                <FaUser />
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-red-600 text-white p-1 rounded-full cursor-pointer">
              <FaCamera />
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <p className="text-sm text-gray-600">প্রোফাইল ছবি আপলোড করুন</p>
        </div>

        {/* Inputs with Icons */}



        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="পূর্ণ নাম"
              className="w-full border p-2 pl-10 rounded"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="ইমেইল"
              className="w-full border p-2 pl-10 rounded"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="phone"
              placeholder="ফোন নম্বর"
              className="w-full border p-2 pl-10 rounded"
              onChange={handleChange}
              required
            />
          </div>
        </div>




        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="পাসওয়ার্ড"
              className="w-full border p-2 pl-10 rounded"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <FaHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="address"
              placeholder="বর্তমান ঠিকানা"
              className="w-full border p-2 pl-10 rounded"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="division"
            value={formData.division}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">বিভাগ</option>
            {divisions.map((d) => (
              <option key={d.id} value={d.bn_name}>
                {d.bn_name}
              </option>
            ))}
          </select>

          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="border p-2 rounded"
            disabled={!formData.division}
            required
          >
            <option value="">জেলা</option>
            {districts.map((d) => (
              <option key={d.id} value={d.bn_name}>
                {d.bn_name}
              </option>
            ))}
          </select>

          <select
            name="thana"
            value={formData.thana}
            onChange={handleChange}
            className="border p-2 rounded"
            disabled={!formData.district}
            required
          >
            <option value="">থানা</option>
            {thanas.map((t) => (
              <option key={t.id} value={t.bn_name}>
                {t.bn_name}
              </option>
            ))}
          </select>
        </div>

        {/* Union and Postcode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="union"
            value={formData.union}
            onChange={handleChange}
            className="border p-2 rounded"
            disabled={!formData.thana}
            required
          >
            <option value="">ইউনিয়ন</option>
            {unions.map((u) => (
              <option key={u.id} value={u.bn_name}>
                {u.bn_name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="postCode"
            value={formData.postCode}
            placeholder="পোস্ট কোড"
            className="border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold"
        >
          নিবন্ধন করুন
        </button>
      </form>
      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={hideToast} />
      )}
    </section>
  );
};

export default Register;





