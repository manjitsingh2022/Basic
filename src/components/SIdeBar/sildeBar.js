import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserAddOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "./style.css";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const SildeBar = () => {
  const rolekey = localStorage.getItem("rolekey");
  return (
    <>
      <Layout className="siderStyle" >
      {/* // ****************AdminsideBar********** */}
        {rolekey === "ROLE_ADMIN" ? (
          <Sider style={{marginTop:62}}>
            <Menu 
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: (
                    <Link to="/">
                      <span>Category</span>
                    </Link>
                  ),
                },
                {
                  key: "2",
                  icon: <VideoCameraOutlined />,
                  label: (
                    <Link to="/advertisementDetail">
                      <span>Ads Manager</span>
                    </Link>
                  ),
                },

                {
                  key: "3",
                  icon: <UserAddOutlined />,
                  label: (
                    <Link to="/advertisement">
                      <span>Advertisement</span>
                    </Link>
                  ),
                },
              ]}
            />
          </Sider>
        ) : (
<>

</>
        // ****************userSIdeBar**********
        
          // <Sider>
          //   <Menu
          //     theme="dark"
          //     mode="inline"
          //     defaultSelectedKeys={["1"]}
          //     items={[
          //       {
          //         key: "1",
          //         icon: <UserAddOutlined />,
          //         label: (
          //           <Link to="/about">
          //             <span>about</span>
          //           </Link>
          //         ),
          //       },
          //     ]}
          //   />
          // </Sider>  
        )}
      </Layout>
    </>
  );
};

export default SildeBar;
