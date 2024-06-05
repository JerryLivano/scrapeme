import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import { fetchUserList } from "../../app/api/userSlice.js";


const Users = (props) => {
    const headerClass = "px-auto px-8 border border-slate-400";
    const bodyClass = "px-2 border border-slate-400";
    const headerName = ["Name", "Email", "Password", "Role"];

    useEffect(() => {
        props.loaduser();
    }, []);

    return (
        <div className="fixed w-full max-w-full">
            <div className="mx-2 my-3 font-sans text-sm font-bold text-2 text-slate-600 text-start">
                <Link to="/user/add" className="px-2 py-2 text-white bg-green-500 rounded-md">Add User +</Link>
            </div>
            <div className="fixed mx-2 my-2 text-center place-content-center ">
                <table className="border border-collapse table-auto border-slate-900 ">
                    <thead className='bg-blue-300'>
                        <tr>
                            {headerName.map((item) => (
                                <th className={headerClass}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {props.user.objlist &&
                            props.user.objlist.map((item) => (
                                <tr key={item.id}>
                                    <td className={bodyClass}>{item.name}</td>
                                    <td className={bodyClass}>{item.email}</td>
                                    <td className={bodyClass}>
                                        {item.password}
                                    </td>
                                    <td className={bodyClass}>{item.role}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispacth) => {
    return {
        loaduser: () => dispacth(fetchUserList()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
