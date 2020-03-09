package com.example.myapplication.entities;

public class User {

    String _id;
    String id_role;
    String first_name;
    String last_name;
    String sex;
    String adress;
    String birthday;
    String img_url;
    String password;
    public User() {
    }
    public User(String _id, String id_role, String first_name, String last_name, String sex, String adress, String birthday, String img_url, String password) {
        this._id = _id;
        this.id_role = id_role;
        this.first_name = first_name;
        this.last_name = last_name;
        this.sex = sex;
        this.adress = adress;
        this.birthday = birthday;
        this.img_url = img_url;
        this.password = password;
    }
    public String get_id() {
        return _id;
    }
    public void set_id(String _id) {
        this._id = _id;
    }
    public String getId_role() {
        return id_role;
    }
    public void setId_role(String id_role) {
        this.id_role = id_role;
    }
    public String getFirst_name() {
        return first_name;
    }
    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }
    public String getLast_name() {
        return last_name;
    }
    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }
    public String getSex() {
        return sex;
    }
    public void setSex(String sex) {
        this.sex = sex;
    }
    public String getAdress() {
        return adress;
    }
    public void setAdress(String adress) {
        this.adress = adress;
    }
    public String getBirthday() {
        return birthday;
    }
    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }
    public String getImg_url() {
        return img_url;
    }
    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
