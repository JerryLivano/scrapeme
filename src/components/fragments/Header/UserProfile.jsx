import { useEffect, useState } from "react";

const UserProfile = () => {
    // const [name, setName] = useState("User");
    // const [urlProfile, setUrlProfile] = useState(
    //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQBSURBVHhe7ZlpSwMxEIan9T7wqop3PRD9/39G/CBeqHjftd76hAREXO1mM9nK7gNL6oLaeTMzmZlUdnd336XAVO1aWEoB7FpYSgHsWlhKAexaWHIR4O3tTV5fX+X5+VleXl7Mz+/v+ZQjUQuhp6cnubq6ktvbW/MZ4yuVinR1dUlfX5/09/fLyMiIdHZ22t/QJ4oA7PbZ2ZkcHR3Jw8ODMfz7jlerVeno6JChoSFZXFw0YiCONuoC4N4HBweyv79vDP8LjB4YGJC1tTWzaqOeA05PT2Vvb68l4wHPuLu7k42NDbm5ubFv9VAV4PLyUra3t00IpKXRaMjm5qZZNVETgAz/GV4m2flCvjg8PFQ9IdQEINPjylm5vr42YmqhJgCxH2LnHh8fgwiZhIoAJDxiN4QAnCLNZlMtDFQE4EvzhADDfZJoq6iFwH9BRQAqOp4QuFJZqypUE2B4eDjIl6YvoCzWQi0ExsfHgzQ1rknSQk0A6ngam6yMjY0FC6efUBOA7m51dVUGBwftm3QQPrTG09PTavEPagJAd3e3rKyspO7qEG9yctJ0hNqzAVUBgDBABNZWdhJ3n52dNTOBnp4e+1aPaBMhSlrKY+YCSbU9Bi8vL6vH/Vei3w1i/MXFhSmVXYVHqOAhPLh/TKIL8BVX32smub+IK/c3MDxP4yFXAdqBUgC7FpYoSZDZAEMSTgCGG8z6mBVyCpADKHZ6e3vNw4lA98e7GPlBVQAMPjk5kfPzc1MHIAJG/zTdccZy/lMP0ATRUI2OjqpWg0EFwDh2l+svjGYwmnUyhDfUajUjBCU1XhKyVggiALtLcYPhboobeoaH0YQHVSKCMG8IIURmAbi92dnZMZPbVm9/skCoIAThQc+AR2QhkwC4+dbWlklssUEI8sT6+rp3yw1ePkRcc+HJ1VUexgMh5q7PyDW+IZdaAP5R2gtPTe7v700I+l7BpRYAo7nrT2pp84DESwL28YLUAmC45lWVD4Qk+SiKABQqZOF2guOQhOhTOaYWAOPn5+fbRgSMpjaYmZmJI4D7h4gQa2z1G+w838V3fphaAMDlpqamTCGSNwsLC/HrAGD3mdzW63X10fV38EJuiyiCGJ/7uL7DWwDH3NycEQJXjIELQe4MJiYm7Ft/gjRDHEMcjZ9/y5zJWTvAJFzouSScZecdQdthiqTj42MjROgqkVZ4aWnJXJeF6AIdQQVwUJsjBN5Aq5w0BPkNdpfcQmgR5zwauUZFAMBgqkZEQBAGJTROSYKwqyRW2lsSHI+7Yf43E6EkMJi8QFjwmdV9Bgxk8oMAPPzMGiLG/yKKAEk4L4hhaBLhsokHGJ6n8ZCrAO1AKYBdC0spgF0LSymAXQuKyAeJwiXdVE7oIgAAAABJRU5ErkJggg=="
    // );
    // const [role, setRole] = useState("User");
  
    useEffect(() => {
    //   const token = setToken();
    //   if (!token) return;
    //   setName(getUserName(token));
    //   const profilePicture = extractProfilePicture(token);
    //   if (profilePicture) {
    //     setUrlProfile(profilePicture);
    //   }
    //   const roles = extractRole(token);
    //   for (const roleName of RoleNames) {
    //     if (roles.includes(roleName.role)) {
    //       setRole(roleName.name);
    //       break;
    //     }
    //   }
    }, []);
  
    return (
      <div className="relative">
        <div className="-m-1 flex items-center p-1">
          <div className="hidden h-10 items-start lg:flex lg:flex-col">
            <div className="text-base font-bold text-gray-900">{name}</div>
          </div>
        </div>
      </div>
       );
    }
    export default UserProfile;