import {

  getUserNotifications,

  markAsRead,

  markAllAsRead,

  deleteNotification,

  clearNotifications,

} from "../services/notification.service.js";

export const getMine = async (req,res)=>{

  try{

    const notifications =
      await getUserNotifications(
        req.params.userId
      );

    res.json({

      success:true,

      data:notifications,

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};

export const read = async(req,res)=>{

  try{

    await markAsRead(req.params.id);

    res.json({

      success:true,

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};

export const readAll = async(req,res)=>{

  try{

    await markAllAsRead(req.params.userId);

    res.json({

      success:true,

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};

export const remove = async (req,res)=>{

  try{

    await deleteNotification(req.params.id);

    res.json({

      success:true,

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};

export const clear = async (req,res)=>{

  try{

    await clearNotifications(req.params.userId);

    res.json({

      success:true,

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};