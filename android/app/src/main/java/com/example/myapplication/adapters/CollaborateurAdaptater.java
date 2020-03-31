package com.example.myapplication.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.example.myapplication.R;
import com.example.myapplication.entities.User;
import com.example.myapplication.managers.UserManager;

import java.util.List;


public class CollaborateurAdaptater extends ArrayAdapter<User> {

    int idLayout;
    public CollaborateurAdaptater(@NonNull Context context, int resource, @NonNull List<User> objects) {
        super(context, resource, objects);
        idLayout = resource;
    }
    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        final User user = getItem(position);
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(idLayout, null);
            ImageView img = convertView.findViewById(R.id.img_listView);
            TextView tv_nom = convertView.findViewById(R.id.lv_nom);
            TextView tv_prenom = convertView.findViewById(R.id.lv_prenom);
            //img.setImageResource();
            tv_nom.setText(user.getFirst_name());
            tv_prenom.setText(user.getLast_name());
        }
        return convertView;
    }
}
