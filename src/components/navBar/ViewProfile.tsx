"use client"

import { useAppSelector } from "@/lib/store/hooks";
import  verification from "../../../public/assets/verify.jpg"
import Image from "next/image";
export default function ViewProfile() {

const  currentUser=useAppSelector((state)=>state.user.activeuser)
console.log("kk",currentUser)
console.log("lo",currentUser)


  const institutes = [
    {
      name: "Bridgeon Solutions",
      image:"data:image/jpeg;base64,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"
    },
    {
      name: "indira gandhi national open university",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStkIsZznuUBcOT2_hbUSeny3JcX3uUWblePw&s",
    },
  ];
console.log("dd",currentUser?.role === "premium");


  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-5">
    


<div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-5">
   
<div className="relative h-36 bg-gray-300">
  <Image
    className="object-cover"
    src={currentUser?.banner || ""}
    alt="Profile Banner"
    fill
  />
</div>

      
    
      <div className="p-6 relative  ">
        <div className="w-24 h-24 rounded-full border-4 border-white absolute -top-12 left-6">
        <Image
            src={currentUser?.profileImage||""}
            alt="Landing Page Illustration"
            width={100}
            height={200}
            className="object-cover rounded-md"
          />
          
        </div>
        <div className=" flex flex-col md:flex-row justify-between">
  <div className="mt-12 flex flex-col items-start">
  <div className="flex items-center justify-between ">
   <h2 className="text-xl font-bold">{currentUser?.firstName} {currentUser?.lastName}</h2>
<span>{currentUser?.role === "premium" && <Image src={verification} width={30}height={20} alt="Verified" />}</span>

</div>
    <p className="text-gray-900">{currentUser?.jobTitle?.map((title)=>title)}</p>
    <p className="text-gray-900 text-sm">{currentUser?.location}• 148 connections</p>
  </div>

  <div className="p-6 ">
    <div className="mt-2 flex flex-col justify-center md:justify-start">
      {institutes.map((institute, index) => (
        <div key={index} className="w-full flex items-center justify-start md:justify-start mb-4">
          <img className="w-14 mb-2" src={institute.image} alt={institute.name}/>
          <p className="text-center">{institute.name}</p>
        </div>
      ))}
    </div>
  </div>
</div>

      </div>
      

      
    
      <div className="p-6 border-t">
        <h3 className="text-lg font-semibold">About</h3>
        <p className="text-gray-600">Software Developer roles 
        1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        </p>
       <div className=" flex justify-center mt-5 "> <button className="text-center border border-slate-300">View More</button></div>
      </div>
    </div>
      

      <div className="p-6 border-t">
        <h3 className="text-lg font-semibold">Experience</h3>
        <div className="mt-2  flex">
         <div>
           <img className="w-14 mr-5" src="data:image/jpeg;base64,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" alt="" />
         
         </div>
          <div>
          <p className="font-bold">Software Engineer</p>
          <p className="text-gray-600">ABC Corp • 2020 - Present</p>
          <p className="text-gray-500 text-sm">Developing modern web applications using React and Tailwind CSS.</p>
          </div>
        </div>
        <hr className="mt-5 mb-5" />
        <div className="mt-2  flex">
         <div>
          <img className="w-14 mr-5" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxESEBIRExITFhUQGRUVEBUTEhUTEhgWFRIYFxUVFhcYHiggGBolHRYVITEiJSkrLi4uGh8zODMsOCgtLisBCgoKDg0OGxAQGy8mICUvLSswMi0tLS8uLS0tLS0tNy81LS0tNS0vLy0vLy0vMi0tLS0tLS4vNS0tLy0tLS81Lf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAYCBQcDAQj/xABCEAACAQICBQgFCQgCAwAAAAAAAQIDEQQxBRIhQWEGBxMiUXGBkTJCUrHwI5KhorLB0dLhFzNicnOCk/EUYyRTwv/EABsBAQACAwEBAAAAAAAAAAAAAAADBQIEBgEH/8QANhEBAAECAwQIBQQDAAMBAAAAAAECAwQRIQUSMUFRYXGBkaHR4RMiMrHwBhQVwSMzQlJi8ST/2gAMAwEAAhEDEQA/AO4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABXdJ8tcDQeq6ynJbHGkuks1mnJdVPg2QV4i3Tz8Fnh9j4u9GcU5R/7ae/krOmuc6dNXpYS8XlUnUTjw2Q/FEM4vP6YWtj9OxP+y5r0RHr6K3PnXx7yhhl3U5/fNmH7m51LCP05hI51eMej5DnW0gvVw776c/umP3NzqJ/TmEnnV4x6LPS5x6kKEatXDwleMHLo5uHpWvZS1sr9plGLnnCvr/T9E17tFcx2xn6NvojnH0fXai6joye6stWPz03FLvaJ6cTRPHRX4jYeLtaxG9HV6cVtpzUkpJpp7U07prtTJ1RMTE5SyDwAAAAAAAAAAAAAAAAAAAAAA0HKjlXQwUet16rV4UYNa77HL2Y8XxsmQ3b9NvjxWOA2Xexk506U85nh7z+Tk47yi5a4zGNqc9Sm8qVPZBr+LfPx2cEaVdyq5pLscHsuxhMqqYzq6Z493R3eLWYeupbMn2fgQTTMN+pMw9dw4xfpReTMeHBjVEVRrx6ULSmAUbVKf7uXnF+y/j9ZY1e0XJ+mri1zQySxVErNoWvGrRdKWcVqtdsXk17jFqXaZpq3oaPSGAnSlZ5P0Zbn+vA9zbNFyK4TeT/KfFYKV6NRqN7ypy61KXfHc+Ks+JnRXVR9MtXF7PsYqMrlOvTHHxdj5H8usPjrU38lX/8AXJ7JWzdOXrbNts1tzSub1q/Fek6S4zaGyLuE+aPmo6ejt/MlsJ1SAAAAAAAAAAAAAAAAAAABTecDll/w6bp0UpV5LPONJPKUlvl2LxeyyetfvxR8scV3snZM4qfiXNKI8+qOrpnujq4q9ITlUlOpKU3N3nKTvJvtuV1dO9rzdzbopt0xTTGUQ9K1K/WW2+a7eK4mETylm8Oj2XW1du9d5NTXnpKGunLglYavfY8/eeVU5MU/DVkrxkrwnsmvvMYnJhXRvcOKFpHRkqfWj1qb2qS22XH8SaGNFyKtJ4odGtKElKLs1kz1nMRMZSsGE0xTqLUqpRbzv6D88vE8ya9Vqqmc6XzE6Bpy2wbjfd6Ufx+k8zKb9UcWOjOSmJq1owpOGte8ZJyi42fptpdW2zb5bbGVNO9OUMb+NtWrc1XOH36uvP8ANHedG0J06NOFSo6s4xSnUaUXJpbXZZfGZY0xMRlLgL1dNdc1UxlE8I6EkyRgAAAAAAAAAAAAAAAABq+UOlVhqTlsc5bKae99r4L9N5p47FxhrW9zng28FhZxFzd5Rx/OtyTSGDdSUql25zblPWd9ZvPb8LuOatY6c/8AJr1u5sX4t0xRMaRpHUrGO0e024rLOO/w/AtaLkTCxic4zhFw1fV2PL3GVVOb1LcHdShtcrbF618rcSOJ5STllqtOi+bvGYhRnKKw6e29W6n39Gtqfe4m7bsXJ4+ahxO2sLZzimd6erh4+ma1YXmupqK6TFVG97pwhBeUtYljBxzlV1/qO5n8luO+Zn7ZJtHm7pQTUcRVs8lOMJJduSRl+1iOaGdvXKpzqojuz/vNXNN82NRXlRlGXCPV+o3byl4GFViqOGqww+3bVWlyJj86fZScToHEQk4uKvHY1fVku9StZkK5ov0VRnE6JWhNCY+pUjSopxcu2cdRK+2Ultsl22957TE1TlCPEYmxaomu5Onn2O4cn9DQwtJQT1pu3S1LWcpd26PYve7s3rduKIycPjMXXia96dI5R0e7aEjUAAAAAAAAAAAAAAAAAABRNOyWLqScW06TcIp5WTztuvnf8DidoYyb9+ZifljSOzp73SYOmcLRETz1/OxXHDVlaaez0lv8DTWme9GdMvLSujNbatsrXhJZTj2d/wAd+xhsTNqcp4fZLhsVu6Tw5x0K3R0JPE1Y0qUX0k3a2S2Zyl2Jb3+hf2s6piKdVlexFuxbm5cnKI/NOuXYOR/IyhgYJ/vK3rVZLK+apr1V9L39itLVimjXm4TaG1r2Lnd4UdHr0/ZZydVgAABrNNaEpYmNpK0l6E0usvxXB/RmR3LcVxq28LjbmGqzp4c45fnWaC0NTw1PVjtlK3STttk/uS3L9WLduKIyMXi68TXvTw5R0e7ZkjUAAAAAAAAAAAAAAAAAABC0viNSk9tnPqx72t3Gyb8Ct2tfmzhapjjOkd/tm2MNb37kdWqn4mOrUhUXrPUn3P0X4M4anhkvqJ3qJonthhpXBa8dZLrRy4rsM6K+UssPe3JynhKDoy1SnKk3tj1oPevh+8zr01T387dcVxz0lcuTOg44eLqOKVWsk6r7LZRXYt749yO12bhZsWIirj9uru+6h2hjasRVFET8lPD1bwsFcAAAAAAAAAAAAAAAAAAAAAAAAAABUOXeJalRgnlrT8dii/tHO7eufRb7Z/PNebHtxMV1T2fnkg4+V6DkuyMl5pnK0fVk2rMZXcp64euCxPSQUt+UlxFVOU5MLtvcqyeWhcDfHpL0UnUkuFsvnNFtsqz8e9TE8I1nu98mWLv5YTOePD87l9O2c0AAAFRq84eDjKUXGteEnF9SOcXZ+sWlGyL9dMVRMePsrq9p2aKppnPweT5y8D7Nfb/1x/Me/wAPiOrx9j+TsdfgyhzkYJ+rX+ZH8x7GxsRPOPH2eTtWxHT4M4c4eDd7RrbFf0I/mPKtj4injl4+zCdsYeOnw93j+0zA+zX/AMcfzHn8Rf6Y8fZL/J2evwP2mYH2a/8Ajj+YfxF/pjx9j+Ts9fgftMwPs1/8cfzD+Iv9MePsfydnr8Fh5P6cpYyk6tJTUYycGpx1XdRTyu9nWRp4jDV2Kt2vt0bNjEUXqd6jsbM104AAAAAAAAAAAAAChcuJXxK4U4r60n95ym25/wD0R2R95dLsiMrE9s/aGGJ2Yb+2H3HPx9bOjW/3yh6DqWm4+0r+K/2zO7GibF050xK2cnqS6WpPeoQj5ym37kdB+nI1uT2eefopcdV/jpp65nyhYDqFWAAAH57xr/8AIr/1Kn22dzhv9cdkfZx+Lj/JPbP3RXH0l2O6JJjPOEcTlMSYd5oW5Lsc0vCvrLie3I+VrXI+VAnGza7G0RN2mc4zYh62mHw8YR1pZ5u+7guJhM5tG5dquVbtLofNRjekhiY2tqSg1/dFr/5KLbFOVVE9Uuj2LRuW6qevNfSmXQAAAAAAAAAAAAACicsqTli4xXrwhb50l9xye3NMRE9UfeXSbKqiMNM9Ez/Tw01NKmo+015R+EUNuM5zS4WM65lA0R++j/d9lklz6Wzif9crjycq/K1o/wANN/Wnf3ov/wBOTpcjs/tQ4+n/AB0Vdc/0sB06rAAAD886Q2Ymt/UqfbZ3GH0pp7I+zkcTrVV2z93k/S7yfhU1uNLCKtLvMYjKpnM50JNF9Zd6M6vplBV9Mo2MjapLvv57TXhPZnOiHzCxvOPf7hPB7dnKiUzSstkV23fl/s8pa2FjWZXrmbjsxb7XRXkqn4opNtT9Edv9Ol2VH1z2f26SUa3AAAAAAAAAAAAAAV/lJQipwrPdFxbeSSd/vZy36itzvW6o55x4ax/a0wFdU0zbjpzUrH4npJ33LZHu7Sjpp3YdBZt/Dpy5pOg4XnKXsr3v9GYXZ0RYurKmIbjk9itXE6zyrdXw9T6UvMsdj4j4WKppnhPy98++jQx1rOxux/zr6rodu58AAAOU6R5u8ZOrOpGVC0pykrzlezk3t6h0tG17FNNMZTnERyj1UNezL1VVU5xlOf5wec+bjGv1qHD5Sf5CSds4eeU+EeqKnZN6Ocefo+S5t8bs61DZ/wBk/wAgnbOHnlPhHqRsm/HOPP0Zfs6xvtUP8k/yHs7aw8xwq8I9Xn8Pe6Y8/RXOUmj5UarhJxbg9Wbi7xva+zZ3o2bF2LlEVRwlXUUTZuVWap1joaqjO0k+xomSV071Mw2Okqd4J+z7n8IwpaWGqyqy6XROaGhbC1p+3VsuKjTj97fkUG2Ks7tMdX9us2XGVqZ618KhZAAAAAAAAAAAAAANLyuwnSYWTWdK1Rdy9L6rfkVu1bPxcNPTGvh7N/Zt34eIjr0/O9zs451TcYanqUrb6m1925eXvZBcnVoXKt+5pwh5YiVlnZtpK2d2zG3nFWcctWVMZr7ofHqtTT9ZbJrj29zO92djYxVmKv8AqNJ7fdzeJsTZry5ck432uAAAAABD0xpGGHoVK08qavbe3lGK4t2RNYs1XrkW6eaK9di1RNc8nEP+Q66m6jvKUpOb4ybd/M6+KIoypjhGjh79VUXfidOrU1abi2nu+LkjcoqiqM4bLAVVKGq92x8V8bDCYaV+iaat6HY+Rej+gwNCnvac3fY/lJOdn3JpeBymOufEv1T3eGjs8DTNOHoz45Z+OreGo2wAAAAAAAAAAAAAHySvseTzExmZ5Oc4nRDp4qVOXoQ66fbB+iuO9eDOGx9j9tdmjly7HUUYv4liKo4zp3s6k7tsqpnN7TTuxkguetVS3Qv5/wC7EuW7R2pssqE/RmNlTrSnH1bRa3NZtMnwmLuYSqK6O+OmGvfs03be7Uu2jdJ068W4PbHZOPrRfFdnE7jC4y3iaN6ie7nDn7+HrszlVCabSAAAAPHGYqFKEqlSSjGO2UpOy/3wM7duq5VFNEZzLGuumineqnKHI+V/Kb/nVFCN40YN9Gnm5ZKpJdu5Lsb7TqsDgIw1ven6p49XU5faGOm9OVP0x5qxCo6c9vdJfejcq+bVpTTFyjTuTq9GNRL6rRHE5NWi5Vblnya0NUrYyjSs9VyvUay6OO2e3ddbO9oixV+LVmqvw7VphaKMVXFHLm7ukce619AAAAAAAAAAAAAAAAa3TmAdWm9X047Y8VviVW1cB+6tfL9UcOvq7/u2sJfi1X83D81UbFT1Yvty8TiKaJ3spdFRGcoeClqqcuxe/wCETXIzyhLXrlCQnqU7vPN/zMi+qth9VTS6Q0hUoxg6c5Qm5N60XZ2ivc75cC82Vbn4s3OiMvH/AOOa/VWLm1aot0TlMzn3R7zDc6J5yqsUo4imqn8cPk597j6LfdY6Sm/VHHVy9na9caXIz64/PRZMPzhYGSvKVSHCVNt/UuSRiKG9TtTDzGszHd6M63OBo+Kv0k5d1Ka+0ke/HoZTtPD8p8mnx3OZFq1Cg77nWaSX9sG7/ORhOI6IaV7bMR/rp8fRSNNaYxGJlrVqjkl6MVshD+WK2eOfEv8AY20bNP8AjriKap59Pp9u9U3cVcvz88+jWt7/AI7zqc0PHRLnTVWCfrLf8biCqN2UNNU2qsuSNQxDpvVktnu4rgeTGaa5bi7G9Txde5B6G6Gj001addJpNWcaecVwbzfh2HNbSxPxK9ynhHnLodkYKbFvfrj5p8oWorVuAAAAAAAAAAAAAAAAAFY5WaBlUXS0l1ltnBetxj/Fw39+dFtLZe/M3rUfNzjp6+379vG12fjYtzuXOHKej2+3ZwqGGhe0ex60vcl9By1zTPPsXlU8zSFW71Vuz7zy1TlGZbjmrekcbNTa1LxWy7Ttx25Z3Os2fa+HYjTjr+dz5r+ocTGIx1WU6U/L4cfPNAlVjLao27ndeTyNqclDNOTDZ3fQeGpdrP6PwBpPBi4b4s9z6WW9ykp4hrY/1PcnlVuJ4PdJPan8fcXGA2zdw+VFfzU+cdk/1Pkj1jSXynJwd14p5PuOqw+LsYqnO1Vn1c47vyHtURXGUr7yK5LrEamJrw+Ti9alCS9NrKT7Ye/uzrto434edq3OvPq9/stNl7Nq3vi3Pp5R0/n5o6Wc86UAAAAAAAAAAAAAAAAAAADUaV0HCrecLRqPN+rJrLW/H3lRtDZNvFfNTpV5T2+v3b2GxtVr5ataft2Oeaaw1XDazqwatdp+rJ8JZMof2F2i7FuuMs58lvf2hat4au/RP0x58o75yhWFpf8Agfzv0Oo0jg+TTEzOczq+utRqZ9WXbk/PLzGkvMph5V8O457U8nuI5jJh2I0k1l5BlExPFipruf0DJ7lLJpPg/jzHB5rBhcNVlUUKcZSnL0YwTk34LcZRqloom78tMZuncleQVrVcYot5qinrRX9R5P8AlWzi8jYtW5pmKs8pW2E2TFM793Xq9V/SJ12+gAAAAAAAAAAAAAAAAAAAAAeWJw8KkXCcYzjL0oyipRfensPJiJ4vKqYqjKVQ0vzbYSrd0nOjJ+z16d/5ZbfBNEVVmJ4aK+7sy1VrToqmN5ssZG/RzpVFu6zhLykrfSRzZqaNey7sfTMShUuSWk6ex4aUovOPSUpLwtLYY7lXQ16tnX//AB84Zy5F49vq4eVn2ypprg7yMZtV8oRRs7Ez/wAfb1e9Dm4x09rVOn269S/2FIyptVti3szET9WUd/osGi+a+lGzr15Ttt1acejj3OTu34WJIsdMt63sqiNa5zXXRmiaGHjq0aUYLfZdZ29qT2y8WTU0U08IWNqzbtRlRGSaZJQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k=" alt="" />
         </div>
          <div>
          <p className="font-bold">Software Engineer</p>
          <p className="text-gray-600">ABC Corp • 2017 - 2020</p>
          <p className="text-gray-500 text-sm">Developing modern web applications using React .</p>
          </div>
        </div>
      </div>
      
      {/* Education Section */}
      <div className="p-6 border-t">
        <h3 className="text-lg font-semibold">Education</h3>
        <div className="mt-2 flex">
          <div>
          <div>
         <img className="w-14 mr-5" src="data:image/jpeg;base64,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" alt="" />
         </div>
          </div>
        <div>
        <p className="font-bold">Bridgeon Solutions</p>
        <p className="text-gray-600">B.Sc. in Computer Science • 2016 - 2020</p>
        </div>
        </div>
        <div className="mt-2 flex">
          <div>
          <div>
         <img className="w-14 mr-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStkIsZznuUBcOT2_hbUSeny3JcX3uUWblePw&s" alt="" />
         </div>
          </div>
        <div>
        <p className="font-bold">indira gandhi national open university</p>
        <p className="text-gray-600">B.Sc. in Computer Science • 2016 - 2020</p>
        </div>
        </div>
      </div>
      
   
      <div className="p-6 border-t">
        <h3 className="text-lg font-semibold">Skills</h3>
        <ul className="mt-2 list-disc list-inside">
          <li>React.js</li>
          <li>Tailwind CSS</li>
          <li>JavaScript</li>
        </ul>
      </div>
      
   
      <div className="p-6 border-t">
  <h3 className="text-lg font-semibold border-b pb-2">Interests</h3>
  <div className="flex space-x-1  overflow-x-auto p-2 justify-center flex-wrap ">
    {/* Person 1 */}
    <div className="flex items-center space-x-3 p-3 border rounded-lg shadow-sm w-64 mb-4 sm:w-80 md:w-96">
      <img
        className="w-12 h-12 rounded-full"
        src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
        alt="Person 1"
      />
      <div>
        <p className="font-semibold">Anushree Jain</p>
        <p className="text-sm text-gray-600">Co-founder, SocialTAG</p>
        <p className="text-xs text-gray-500">150,808 followers</p>
        <button className="mt-1 px-3 py-1 text-gray-700 border rounded-full text-sm">✓ Following</button>
      </div>
    </div>
    {/* Person 2 */}
    <div className="flex items-center space-x-3 p-3 border rounded-lg shadow-sm w-64 mb-4 sm:w-80 md:w-96">
      <img
        className="w-12 h-12 rounded-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&s"
        alt="Person 2"
      />
      <div>
        <p className="font-semibold">Nidhi Sharma</p>
        <p className="text-sm text-gray-600">Tech Mentor | Top Voice</p>
        <p className="text-xs text-gray-500">57,747 followers</p>
        <button className="mt-1 px-3 py-1 text-gray-700 border rounded-full text-sm">✓ Following</button>
      </div>
    </div>
    {/* Person 3 */}
    <div className="flex  items-center space-x-3 p-3 border rounded-lg shadow-sm w-64 mb-4 sm:w-80 md:w-96">
      <img
        className="w-12 h-12 rounded-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&s"
        alt="Person 3"
      />
      <div>
        <p className="font-semibold">Nidhi Sharma</p>
        <p className="text-sm text-gray-600">Tech Mentor | Top Voice</p>
        <p className="text-xs text-gray-500">57,747 followers</p>
        <button className="mt-1 px-3 py-1 text-gray-700 border rounded-full text-sm">✓ Following</button>
      </div>
    </div>
    {/* Person 4 */}
    <div className="flex items-center space-x-3 p-3 border rounded-lg shadow-sm w-64 mb-4 sm:w-80 md:w-96">
      <img
        className="w-12 h-12 rounded-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&s"
        alt="Person 4"
      />
      <div>
        <p className="font-semibold">Nidhi Sharma</p>
        <p className="text-sm text-gray-600">Tech Mentor | Top Voice</p>
        <p className="text-xs text-gray-500">57,747 followers</p>
        <button className="mt-1 px-3 py-1 text-gray-700 border rounded-full text-sm">✓ Following</button>
      </div>
    </div>
  </div>
  <button className="w-full text-blue-600 mt-3 text-sm">Show all Top Voices →</button>
</div>


    </div>
  );
}
