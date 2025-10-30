import { Grid } from "@mui/material";
import CallVolumeChart from "./BarGraph";
import DashboardCards from "./Header";
import RecentMessages from "./RecentMessage";
import Footer from "./Footer";




export default function Home()  {
    return (
        <>
        <DashboardCards />
        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{xs:12,md:8}}>
             <CallVolumeChart />
            </Grid>
            <Grid size={{xs:12,md:4}}>
            <RecentMessages />
            </Grid>
        </Grid>
        <Footer />
        </>
            
       
    );
}