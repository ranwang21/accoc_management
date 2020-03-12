package com.example.myapplication.adapters;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.myapplication.R;

import java.util.List;

public class PresenceAdapter extends ArrayAdapter {

    Context context;
    List<String> modelItems;

    public PresenceAdapter(Context context, List<String> resource) {
        super(context, R.layout.fragment_presence, resource);
        this.context = context;
        this.modelItems = resource;
    }

    public View getView(int position, View convertView, ViewGroup parent) {
        LayoutInflater inflater = (( Activity ) context).getLayoutInflater();
        convertView = inflater.inflate(R.layout.fragment_presence_row, parent, false);
        TextView name = convertView.findViewById(R.id.textView1);
        CheckBox cb = convertView.findViewById(R.id.checkBox1);
        ImageView img = convertView.findViewById(R.id.imageView3);
        name.setText(modelItems.get(position));
        return convertView;
    }
}
