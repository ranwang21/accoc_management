package com.example.myapplication.adapters;

import android.content.Context;
import android.database.Cursor;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.SimpleCursorAdapter;

import com.example.myapplication.R;

import java.util.ArrayList;

public class CheckboxAdapter  extends SimpleCursorAdapter {
    private Cursor c;
    private Context context;
    private ArrayList<String>list =new ArrayList<String>();
    private ArrayList <Boolean> itemChecked =new ArrayList<Boolean>();
int idLayout;
    public CheckboxAdapter(Context context,int layout,Cursor c,String[] from,int[] to){
        super(context, layout, c, from, to);
        this.c=c;
        this.context=context;
idLayout=layout;
        for(int i=0;i<this.getCount();i++){
            itemChecked.add(i,false);
        }
    }
    public View getView(final int pos, View inView, ViewGroup parent){
if(inView==null){
    LayoutInflater inflater=(LayoutInflater)context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    inView=inflater.inflate(idLayout,null);
}
final CheckBox checkBox=(CheckBox)inView.findViewById(R.id.checkBox1);
checkBox.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        CheckBox cb=(CheckBox)v.findViewById(R.id.checkBox1);
        if(cb.isChecked()){
            itemChecked.set(pos,true);
        }else if (!cb.isChecked()){
            itemChecked.set(pos,false);
        }
    }
});
checkBox.setChecked(itemChecked.get(pos));
        return inView;
    }
}
