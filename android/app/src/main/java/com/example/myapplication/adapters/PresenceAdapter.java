package com.example.myapplication.adapters;

import android.app.Activity;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.myapplication.R;
import com.example.myapplication.entities.Classroom;
import com.example.myapplication.entities.Schedule;
import com.example.myapplication.entities.User;
import com.example.myapplication.managers.ClassroomManager;
import com.example.myapplication.managers.ScheduleManager;
import com.example.myapplication.managers.UserManager;
import com.example.myapplication.services.ConnectionBD;

import java.util.ArrayList;
import java.util.List;


public class PresenceAdapter extends ArrayAdapter<User> {

    private ArrayList<Schedule> schedList;
    // Context context;
    //List<String> modelItems;
    int idLayout;

    public PresenceAdapter(Context context, int resource, List<User> objects) {
        super(context, resource, objects);
        idLayout = resource;
        //     this.context = context;
        //   this.modelItems = resource;
    }


    private class ViewHolder {

        CheckBox cb;
    }

    public View getView(int position, View convertView, ViewGroup parent) {
        final User user = getItem(position);
        ViewHolder holder = null;
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(idLayout, null);
            //LayoutInflater inflater = (( Activity ) context).getLayoutInflater();
            //  convertView = inflater.inflate(R.layout.fragment_presence_row, parent, false);
            holder = new ViewHolder();
            Button btn = convertView.findViewById(R.id.button_presence);
            TextView Fname = convertView.findViewById(R.id.textView1);
            TextView Lname = convertView.findViewById(R.id.textView2);
            CheckBox cb = convertView.findViewById(R.id.checkBox1);
            ImageView img = convertView.findViewById(R.id.imageView3);
            Fname.setText(user.getFirst_name());
            Lname.setText(user.getLast_name());
            Glide.with(getContext()).load(user.getImg_url()).into(img);




/*convertView.setTag(holder);
holder.cb.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        ArrayList<User> user=new ArrayList<>();
      ArrayList<Schedule>schedules=ScheduleManager.getAll(getContext());
      for(Schedule s:schedules){
          if(s.getDate().equals("date")){
user=UserManager.getBySchedule(getContext(),s.get_id());         }
      }if(user !=null){
          Log.d("Tag","sucess");}

boolean check;
        CheckBox checkBox=(CheckBox) v;
        Schedule schedule =(Schedule)checkBox.getTag();
        Toast.makeText(getContext(),"Clicked on checkbox"+checkBox.getText()+"is"+checkBox.isChecked(),Toast.LENGTH_LONG).show();
       /* if(checkBox.isChecked()){
            check=true;
        }else {check=false}


    }
});
        }else {
            holder=(ViewHolder)convertView.getTag();
        }
        Schedule schedule=schedList.get(position);
        holder.cb.setText(schedule.getDate());
        holder.cb.setChecked(schedule.getIs_absent());
        holder.cb.setTag(schedule);
*/}
            return convertView;

    }
}
