

const Profile = () => {
    return (
        <div className="container py-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h2 className="card-title">Admin Profile</h2>
                    <p className="card-text">Welcome, Admin! Manage your profile and settings here.</p>
                </div>

                <div className="card-body">
                    <div className="row g-4">
                        {/* Personal Information Section */}
                        <div className="col-md-6">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <h5 className="card-title">Personal Information</h5>
                                    <p className="card-text"><strong>Name:</strong> Admin User</p>
                                    <p className="card-text"><strong>Email:</strong> admin@example.com</p>
                                    <p className="card-text"><strong>Role:</strong> Administrator</p>
                                </div>
                            </div>
                        </div>

                        {/* Settings Section */}
                        <div className="col-md-6">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <h5 className="card-title">Settings</h5>
                                    <button className="btn btn-primary w-100 mb-2">Edit Profile</button>
                                    <button className="btn btn-danger w-100">Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Section */}
                    <div className="mt-4">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title">Recent Activity</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Logged in on January 25, 2025</li>
                                    <li className="list-group-item">Updated profile settings</li>
                                    <li className="list-group-item">Reviewed user feedback</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profile
