import { useEffect } from "react";
import { fetchUserList } from "../../assets/api/UserSlice";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Users = (props) => {
    const headerClass = "px-auto px-8 border border-slate-400";
    const bodyClass = "px-2 border border-slate-400";
    const headerName = ["Name", "Email", "Password", "Role"];

    useEffect(() => {
        props.loaduser();
    }, []);

    return (
        <div className='fixed max-w-full w-full'>
            <div className='text-2 text-sm font-bold font-sans text-slate-600 my-3 text-start mx-2'>
                <Link
                    to='/user/add'
                    className='bg-green-500 rounded-md py-2 px-2 text-white'
                >
                    Add User +
                </Link>
            </div>
            <div className='fixed my-2 mx-2 text-center place-content-center '>
                <table className='table-auto border-collapse border border-slate-900 '>
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
