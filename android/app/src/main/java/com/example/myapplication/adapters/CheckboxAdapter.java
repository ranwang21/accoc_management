package com.example.myapplication.adapters;

import android.content.Context;
import android.database.Cursor;
import android.service.autofill.AutofillService;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.RadioGroup;
import android.widget.SimpleCursorAdapter;
import android.widget.TextView;
import android.widget.CompoundButton.OnCheckedChangeListener;

import com.example.myapplication.R;
import com.example.myapplication.entities.Schedule;
import com.example.myapplication.entities.User;
import com.google.android.material.button.MaterialButton;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import androidx.recyclerview.widget.RecyclerView;

public class CheckboxAdapter  extends ArrayAdapter<Schedule> {
    List<Schedule> schedules;
    Context context;
    int idLayout;

    public CheckboxAdapter(Context context, int resource, List<Schedule> objects) {
        super(context, resource, objects);
        idLayout = resource;
        this.context = context;
        schedules = objects;

    }

    public View getView(final int pos, View convertView, ViewGroup parent) {
       // final Schedule schedule = getItem(pos);
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(idLayout, null);

            CheckBox checkBox = convertView.findViewById(R.id.checkBox1);

            if (checkBox.isChecked()) {
                schedules.get(pos).setIs_absent(true);
            } else {
                schedules.get(pos).setIs_absent(false);
            }

checkBox.setOnCheckedChangeListener(new OnCheckedChangeListener() {
    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        if(isChecked){
            schedules.get(pos).setIs_absent(true);
        }else {
            schedules.get(pos).setIs_absent(false);
        }
    }
});
        }

        return convertView;
    }
}