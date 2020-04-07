package com.example.myapplication.adapters;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.myapplication.R;
import com.example.myapplication.entities.Schedule;
import com.example.myapplication.entities.User;

import java.util.List;

public class PresenceAdapter extends ArrayAdapter<User> {

   // Context context;
    //List<String> modelItems;
int idLayout;
    public PresenceAdapter(Context context,int resource ,List<User> objects) {
        super(context, resource, objects);

        idLayout=resource;
        //     this.context = context;
     //   this.modelItems = resource;
    }

    public View getView(int position, View convertView, ViewGroup parent) {
        final User user =getItem(position);

        if(convertView==null) {
            convertView=LayoutInflater.from(getContext()).inflate(idLayout,null);
            //LayoutInflater inflater = (( Activity ) context).getLayoutInflater();
          //  convertView = inflater.inflate(R.layout.fragment_presence_row, parent, false);
            Button btn=convertView.findViewById(R.id.button_presence);
            TextView Fname = convertView.findViewById(R.id.textView1);
            TextView Lname = convertView.findViewById(R.id.textView2);
            CheckBox cb = convertView.findViewById(R.id.checkBox1);
            ImageView img = convertView.findViewById(R.id.imageView3);
            Fname.setText(user.getFirst_name());
            Lname.setText(user.getLast_name());
            Glide.with(getContext()).load(user.getImg_url()).into(img);

        }
        return convertView;
    }
}
