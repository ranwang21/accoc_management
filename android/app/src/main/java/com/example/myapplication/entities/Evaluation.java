package com.example.myapplication.entities;

public class Evaluation {

    String _id;
    String id_schedule;
    public Evaluation() {
    }
    public Evaluation(String id_schedule) {
        this.id_schedule = id_schedule;
    }
    public Evaluation(String _id, String id_schedule) {
        this._id = _id;
        this.id_schedule = id_schedule;
    }
    public String get_id() {
        return _id;
    }
    public void set_id(String _id) {
        this._id = _id;
    }
    public String getId_schedule() {
        return id_schedule;
    }
    public void setId_schedule(String id_schedule) {
        this.id_schedule = id_schedule;
    }
}
