import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import { useState } from 'react';

export default function Delete({ cour, onDeleted }) {
    const [open, setOpen] = useState(false);
    const { delete: destroy, processing, reset, clearErrors, recentlySuccessful } = useForm({});

    const deleteCour = (e) => {
        e.preventDefault();

        destroy(route('cours.destroy', cour.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                reset();
                if (onDeleted) onDeleted(cour.id); // notify parent
            },
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
        setOpen(false);
    };

    return (
        <div>
            <Transition
                show={recentlySuccessful}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed top-12 right-3 rounded bg-green-500 p-2 whitespace-nowrap">
                    <p className="text-sm font-semibold text-white">Deleted successfully!</p>
                </div>
            </Transition>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="link" className="!p-0">
                        <Trash />
                        Delete
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Are you sure you want to delete {cour.name} ?</DialogTitle>
                    <DialogDescription>This action cannot be undone. All data will be lost.</DialogDescription>
                    <form onSubmit={deleteCour}>
                        <DialogFooter className="mt-4 gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary" onClick={closeModal}>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" variant="destructive" disabled={processing}>
                                Delete
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
