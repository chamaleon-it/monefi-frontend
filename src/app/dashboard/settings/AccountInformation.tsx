"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";

export default function AccountInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    accountType: "Individual",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/users/profile");
      const user = data.data;
      setFormData({
        accountType: user.accountType || "Individual",
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.patch("/users/profile", {
        name: formData.name,
        accountType: formData.accountType,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center animate-pulse text-gray-500">Loading profile...</div>;
  }

  return (
    <Card className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_15px_35px_rgba(8,35,72,0.04)] overflow-hidden font-inter">
      <CardHeader className="flex flex-row items-center justify-between pb-5 border-b border-slate-100">
        <CardTitle className="text-xl font-serif font-bold text-[#082348]">Entity & Contact Information</CardTitle>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          disabled={saving}
          className={isEditing ? "gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer" : "rounded-xl border-slate-200 text-[#082348] font-bold text-xs uppercase tracking-wider hover:bg-slate-50 cursor-pointer"}
        >
          {saving ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Account Type</Label>
            <Select
              disabled={!isEditing}
              value={formData.accountType}
              onValueChange={(val) => setFormData({ ...formData, accountType: val })}
            >
              <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Individual">Individual</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Name / Business Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              value={formData.email}
              disabled={true}
              className="bg-gray-100 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500">Email cannot be changed.</p>
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
              placeholder="e.g. +1 234 567 8900"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Address</Label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
              placeholder="Full address"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
