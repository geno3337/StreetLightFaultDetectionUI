import AdminModal from "../adminModel/adminModel";
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { Typography,TextField,Button, Paper } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
import { useState } from "react";
// import AuthService from "../../../service/auth-service";
// import ResponseAlert from "../../userPageComponents/responseAlert/responseAlert";
import MenuItem from '@mui/material/MenuItem';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Service from "../../service/service";


export default function AddLightModel(props){

  
//   const validationSchema = Yup.object().shape({
//     Place: Yup.string().required('Name is required'),
//     Id: Yup.string().required('Email is required').email("Enter a valid email").test(
//       'is-Id',
//       'Email must be a valid Id address',
//       (value) => value.endsWith('@Id.com')
//     ),
//     role:Yup.string().required().oneOf(['user','admin'],"the role must be either user or admin")
// });


const { control, handleSubmit, setValue, register, formState: { errors },setError } = useForm(
    // { resolver: yupResolver(validationSchema) }
);

const [submitResponse, setSubmitResponse] =useState()
const [submitError, setSubmitError] = useState()
const [response,setResponse]=useState("")
const [location,setLocation]=useState()
useEffect(() => {
  // getLocation()
})

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setValue("lat", location?.latitude)
        setValue("lng", location?.longitude)
      },
      (error) => {
        setError(error.message);
      }
    );
  } else {
    setError('Geolocation is not supported by this browser.');
  }
};



// const formData = (data) => {
//     console.log("Callback function when form is submitted!");
//     console.log(data)
//     AuthService.addUser(data).then(
//         (response) => {
//             setSubmitResponse(response.data)
           
//     }
//     )
//     .catch((err) => {
//       console.log(err.code);
//       // if (console.log(err.code)=="ERR_BAD_REQUEST") {
//         err?.response?.data?.violations.forEach((error) => {
//           setError(error.fieldName, {
//             type: 'manual',
//             message: error.message,
//           });
//         });
//       // }
//       // if(err?.response?.data?.message!=null){
//         console.log("error: ", err.response?.data?.message);
//         setSubmitError(err.response?.data?.message)
//       }
//     // }
//     )
//     props.onSubmit
// };

const formData = (data) => {
  console.log("Callback function when form is submitted!");
  console.log(data)
  Service.addLightDetail(data).then(
      (response) => {
          // setSubmitResponse(response.data)
          let updatedValue = {};
          updatedValue = {color:"green",message:response.data};
                 setResponse(updatedValue)
                 console.log(updatedValue)
                 setTimeout(() => {
                  setResponse();
                }, 5000); 
                setValue("id", '')
                setValue("place",'')
                setValue("lat", '')
                setValue("lng", '')  
  }
  )
  .catch((err) => {
    console.log(err.code);
      err?.response?.data?.violations.forEach((error) => {
        setError(error.fieldName, {
          type: 'manual',
          message: error.message,
        });
      });
      // console.log("error: ", err.response?.data?.message);
      // setSubmitError(err.response?.data?.message)
      console.log("error: ", err.response.data.message);
      let updatedValue = {};
 updatedValue = {color:"red",message:err.response.data.message};
        setResponse(updatedValue)
        console.log(updatedValue)
        setTimeout(() => {
          setResponse();
        }, 5000); 
    }
  // }
  )
};
    return(
        <>
        <Paper elevation={6} sx={{width:400,marginLeft:50}} >
        <Box 
            sx={{
              // marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 2, bgcolor: 'primary.main'  }}>
              <TipsAndUpdatesIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Light
            </Typography>
            <Typography color={response?.color}>{response?.message}</Typography>
            <Box component="form"
            onSubmit={handleSubmit(formData)}
              sx={{
                mt: 1,
                width: 300,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <TextField label="Id" variant="outlined"
                margin="normal"
                required
                fullWidth
                name="id"
                id="id"
                {...register('id')}
                error={!!errors.id}
                helperText={errors.id?.message}
              />
              <TextField label="Place" variant="outlined"
                margin="normal"
                required
                fullWidth
                name="place"
                id="place"
                {...register('place')}
                error={!!errors.place}
                helperText={errors.place?.message}
              />
              <TextField label="latitude" variant="outlined"
                margin="normal"
                required
                fullWidth
                name="lat"
                id="lat"
                {...register('lat')}
                error={!!errors.lat}
                helperText={errors.lat?.message}
              />
              <TextField label="longitude" variant="outlined"
                margin="normal"
                required
                fullWidth
                name="lng"
                id="lng"
                {...register('lng')}
                error={!!errors.lng}
                helperText={errors.lng?.message}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: 100 }}
              >
                Submit
              </Button>
              {/* {
                error && <Alert severity="error" variant="filled"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                    //   onClick={() => {
                    //     setError()
                    //   }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }

                >{error}</Alert>
              } */}
            </Box>
          </Box> 
        {/* {
              submitResponse && <ResponseAlert 
              type="success"
              handleClick={()=>setSubmitResponse()} 
              >
                {submitResponse}
              </ResponseAlert>
            }
            {
              submitError && <ResponseAlert 
              type="error"
              handleClick={()=>setSubmitError()} 
              >
                {submitError}
              </ResponseAlert>
            } */}
            </Paper>
        </>
    )
}