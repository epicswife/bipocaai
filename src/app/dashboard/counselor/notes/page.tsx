"use client";

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, Timestamp, addDoc } from 'firebase/firestore';
import { Search, Plus, Tag, Clock, AlertCircle, Lock } from 'lucide-react';

interface Note {
  id: string;
  studentId: string;
  studentName: string;
  type: 'observation' | 'intervention' | 'meeting' | 'followup';
  category: 'academic' | 'behavioral' | 'social' | 'career';
  content: string;
  tags: string[];
  confidential: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  followUpDate?: Timestamp;
}

interface Student {
  id: string;
  name: string;
  grade: string;
}

export default function NotesPage() {
  const { user, loading } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const [newNote, setNewNote] = useState({
    studentId: '',
    type: 'observation',
    category: 'academic',
    content: '',
    tags: '',
    confidential: false,
    followUpDate: ''
  });

  const fetchData = useCallback(async () => {
    if (!user?.uid) return;

    try {
      // Fetch students
      const studentsQuery = query(
        collection(db, 'students'),
        where('counselorId', '==', user.uid),
        orderBy('name')
      );
      const studentsSnapshot = await getDocs(studentsQuery);
      const studentsData = studentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Student[];
      setStudents(studentsData);

      // Fetch notes
      const notesQuery = query(
        collection(db, 'notes'),
        where('counselorId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const notesSnapshot = await getDocs(notesQuery);
      const notesData = notesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Note[];
      setNotes(notesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateNote = async () => {
    if (!user?.uid || !newNote.studentId || !newNote.content) return;

    try {
      const noteData = {
        ...newNote,
        counselorId: user.uid,
        tags: newNote.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        followUpDate: newNote.followUpDate ? new Date(newNote.followUpDate) : null
      };

      await addDoc(collection(db, 'notes'), noteData);
      await fetchData();
      setShowNewNoteForm(false);
      setNewNote({
        studentId: '',
        type: 'observation',
        category: 'academic',
        content: '',
        tags: '',
        confidential: false,
        followUpDate: ''
      });
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStudent = !selectedStudent || note.studentId === selectedStudent;
    const matchesType = selectedType === 'all' || note.type === selectedType;
    
    return matchesSearch && matchesStudent && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'observation':
        return <Search className="h-4 w-4" />;
      case 'intervention':
        return <AlertCircle className="h-4 w-4" />;
      case 'meeting':
        return <Clock className="h-4 w-4" />;
      case 'followup':
        return <Tag className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  if (loading || isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-orbitron font-bold text-primary">Student Notes</h1>
        <Button 
          className="bg-primary"
          onClick={() => setShowNewNoteForm(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      {showNewNoteForm && (
        <Card className="border-primary/20 mb-8">
          <CardHeader>
            <CardTitle>Create New Note</CardTitle>
            <CardDescription>Document your observation or intervention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  value={newNote.studentId}
                  onValueChange={(value) => setNewNote({...newNote, studentId: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} - Grade {student.grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={newNote.type}
                  onValueChange={(value: 'observation' | 'intervention' | 'meeting' | 'followup') => setNewNote({...newNote, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select note type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="observation">Observation</SelectItem>
                    <SelectItem value="intervention">Intervention</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select
                value={newNote.category}
                onValueChange={(value: 'academic' | 'behavioral' | 'social' | 'career') => setNewNote({...newNote, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                </SelectContent>
              </Select>

              <Textarea
                placeholder="Enter note content..."
                value={newNote.content}
                onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                className="min-h-[100px]"
              />

              <Input
                placeholder="Tags (comma-separated)"
                value={newNote.tags}
                onChange={(e) => setNewNote({...newNote, tags: e.target.value})}
              />

              <div className="flex items-center gap-4">
                <Input
                  type="date"
                  placeholder="Follow-up date"
                  value={newNote.followUpDate}
                  onChange={(e) => setNewNote({...newNote, followUpDate: e.target.value})}
                />

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newNote.confidential}
                    onChange={(e) => setNewNote({...newNote, confidential: e.target.checked})}
                  />
                  Confidential
                </label>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNewNoteForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateNote}>
                  Save Note
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-8 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by student" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Students</SelectItem>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="observation">Observations</SelectItem>
                <SelectItem value="intervention">Interventions</SelectItem>
                <SelectItem value="meeting">Meetings</SelectItem>
                <SelectItem value="followup">Follow-ups</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(note.type)}
                    <CardTitle className="text-lg">{note.studentName}</CardTitle>
                    {note.confidential && (
                      <Lock className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <CardDescription>
                    {new Date(note.createdAt.seconds * 1000).toLocaleString()}
                  </CardDescription>
                </div>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {note.type}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4 whitespace-pre-wrap">{note.content}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {note.followUpDate && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  Follow-up: {new Date(note.followUpDate.seconds * 1000).toLocaleDateString()}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
