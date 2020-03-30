package com.example.myapplication;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.TableLayout;
import android.widget.TableRow;

import androidx.appcompat.app.AppCompatActivity;


public class SuiviQuotidienActivity extends AppCompatActivity {

    ImageView img_smile1;
    ImageView img_smile2;
    ImageView img_smile3;
    ImageView img_neutral;
    TableRow tablerow2;
    TableLayout table;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_suivi_quotidien);
        table = findViewById(R.id.table);
        tablerow2 = findViewById(R.id.tablerow2);
        img_smile1 = findViewById(R.id.image_smile1);
        img_smile2 = findViewById(R.id.image_smile2);
        img_smile3 = findViewById(R.id.image_smile3);
//        parcourir chaque cellule et mettre l'image a setvisible quand on clique dans la cellule.
        table = findViewById(R.id.table);
        tablerow2 = findViewById(R.id.tablerow2);
        for (int i = 0; i < table.getChildCount(); ++i) {
            TableRow row = (TableRow) table.getChildAt(i);
            for (int j = 0; j < row.getChildCount(); ++j) {
                View view = (View) row.getChildAt(j);
                view.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        if (v instanceof ImageView) {
                            showImage(img_smile1);
                        }
                    }
                });
            }
        }
    }

    private void showImage(ImageView imageView) {
        if (imageView.getVisibility() == View.INVISIBLE) {
            imageView.setVisibility(View.VISIBLE);
        } else {
            imageView.setVisibility(View.INVISIBLE);
        }
    }
}


